<?php

namespace App\Command;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\StyleInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsCommand(
    name: 'app:import-tmdb',
    description: 'Import from TMDB API',
)]
class ImportTmdbCommand extends Command
{
    const string TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    const string SEARCH_MOVIE = self::TMDB_BASE_URL.'/search/movie?query=%s&include_adult=true&year=%d&page=%d';

    const int YEAR_START = 1901;

    const HEADERS = [
        'headers'=> [
            'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGQ4ZTE2NzcwNDUyOWFjNTBlYmMxMjFhNjJmOWUwYSIsIm5iZiI6MTc4MDkyODk4MS44MzMsInN1YiI6IjZhMjZkMWQ1MTFhMDRkYmQxM2M3NmU4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mxBlxKjh8u53mRrjwjf0Ia1Mh5X6VojJrvBIgUDNGYo',
            'Accept' => 'application/json',
        ]
    ];

    public function __construct(private readonly HttpClientInterface $client, private readonly Connection $connection)
    {
        parent::__construct();
    }

    public function configure(): void
    {
        $this->addArgument('search', InputArgument::REQUIRED);
    }

    /** @throws TransportExceptionInterface|ClientExceptionInterface|DecodingExceptionInterface|RedirectionExceptionInterface|ServerExceptionInterface|Exception
     */
    private function request(StyleInterface $io, string $search, int $year, int $page): bool
    {
        $response = $this->client->request(Request::METHOD_GET, \sprintf(self::SEARCH_MOVIE, $search, $year, $page), self::HEADERS);

        $res = $response->toArray();

        foreach ($res['results'] as $result) {
            if ($result['original_language'] === 'ja') {
                continue;
            }

            if (!isset($result['release_date'])) {
                $result['release_date'] = '1970-01-01';
            }

            try {
                $this->connection->executeStatement(
                    <<<SQL
    INSERT INTO content
        (title, description, release_date, poster, minimal_age, type)
    VALUES
        (:title, :description, :release_date, :poster, :minimal_age, :type)
    ON CONFLICT (title, release_date) DO NOTHING
    SQL,
                    [
                        'title' => substr($result['title'], 0, 100),
                        'description' => mb_substr($result['overview'], 0, 500),
                        'release_date' => $result['release_date'] ?: '1970-01-01',
                        'poster' => $result['poster_path'],
                        'minimal_age' => $result['adult'] ? 18 : 12,
                        'type' => '',
                    ]
                );
            } catch (\Exception $e) {
                $io->error($e->getMessage());
            }
        }

        $io->writeln(sprintf(
            'Memory: %.2f MB',
            memory_get_usage(true) / 1024 / 1024
        ));

        return $res['page'] < $res['total_pages'];
    }

    private function searchItem(StyleInterface $io, string $search) {
        $page = 1;
        $year = self::YEAR_START;

        $currentYear = date('Y');

        while ($year < $currentYear) {
            while ($this->request($io, $search, $year, $page)) {
                $io->writeln(sprintf(
                    'Request page %d for search %s and year %d',
                    $page,
                    $search,
                    $year,
                ));

                gc_collect_cycles();
                $page++;
            }

            $year++;
        }
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $search = $input->getArgument('search');

        try {
            $this->searchItem($io, $search);
        } catch (ClientExceptionInterface|RedirectionExceptionInterface|ServerExceptionInterface $e) {
            $io->error($e->getMessage());
        }

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }
}
