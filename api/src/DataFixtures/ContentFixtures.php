<?php

namespace App\DataFixtures;

use App\Factory\ContentFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ContentFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        ContentFactory::createMany(20);

        $manager->flush();
    }
}
