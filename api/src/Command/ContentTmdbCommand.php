<?php

namespace App\Command;

use App\Entity\Content;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsCommand(
    name: 'app:content:tmdb',
    description: 'Add a short description for your command',
)]
class ContentTmdbCommand extends Command
{
    public function __construct(
        #[Autowire(env: 'TMDB_TOKEN')]
        private string $token,
        private EntityManagerInterface $entityManager,
        private HttpClientInterface $httpClient)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $responseInterface = $this->httpClient->request(
            "GET",
            "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=c",
            ["headers" => [
                "Accept" => "application/json",
                "Authorization" => "Bearer $this->token"
            ]]
        );

        $response = $responseInterface->toArray();
        $results = $response["results"];

        foreach ($results as $result) {
            if (strlen($result["overview"]) <= 500) {
                $isAdult = $result["adult"];
                $dateString = $result["release_date"];
                $format = 'Y-m-d';
                $releaseDate = \DateTime::createFromFormat($format, $dateString);

                $content = new Content();
                $content->setTitle($result["title"]);
                $content->setDescription($result["overview"]);
                $content->setReleaseDate($releaseDate);
                $content->setPoster($result["poster_path"]);
                $content->setMinimalAge($isAdult ? 18 : 12);
                $content->setType('');

                $this->entityManager->persist($content);
                $this->entityManager->flush();
            }
        }

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }
}
