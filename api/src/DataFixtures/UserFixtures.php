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

        $users = UserFactory::createMany(20);
        foreach ($users as $user) {
            $friendsCount = rand(1, min(5, count($users) - 1));
            $randomFriends = (array)array_rand($users, $friendsCount);

            foreach ($randomFriends as $index) {
                $friend = $users[$index];

                if ($user === $friend) {
                    continue;
                }
                $user->addFriend($friend);
            }
        }

        $manager->flush();
    }
}
