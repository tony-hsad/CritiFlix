<?php

namespace App\DataFixtures;

use App\Factory\ActorFactory;
use App\Factory\ContentFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ActorFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $actors = ActorFactory::createMany(5);

        $contents = ContentFactory::all();
        if (0 === count($contents)) {
            $contents = ContentFactory::createMany(5);
        }

        foreach ($actors as $actor) {
            $contentsCount = rand(1, min(5, count($actors) - 1));

            $randomContents = (array)array_rand($contents, $contentsCount);
            foreach ($randomContents as $index) {
                $content = $contents[$index];
                $actor->addContent($content);
            }
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            ContentFixtures::class,
        ];
    }
}
