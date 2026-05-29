<?php

namespace App\DataFixtures;

use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createOne([
            'lastname' => 'Foo',
            'firstname' => 'Bar',
            'email' => 'foo.bar@admin.fr',
            'password' => 'admin1234',
            'roles' => ['ROLE_ADMIN'],
        ]);

        UserFactory::createMany(75);

        $manager->flush();
    }
}
