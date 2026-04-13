<?php

namespace App\DataFixtures;

use App\Factory\ActorFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ActorFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        ActorFactory::createMany(5);

        $manager->flush();
    }
}
