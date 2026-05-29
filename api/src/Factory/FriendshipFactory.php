<?php

namespace App\Factory;

use App\Config\FriendshipStatus;
use App\Entity\Friendship;
use Zenstruck\Foundry\Persistence\PersistentObjectFactory;

/**
 * @extends PersistentObjectFactory<Friendship>
 */
final class FriendshipFactory extends PersistentObjectFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
    }

    #[\Override]
    public static function class(): string
    {
        return Friendship::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    #[\Override]
    protected function defaults(): array|callable
    {
        $status = [FriendshipStatus::Accepted, FriendshipStatus::Pending, FriendshipStatus::Rejected];
        $randomStatus = $status[array_rand($status)];

        return [
            'receiver' => UserFactory::random(),
            'sender' => UserFactory::random(),
            'status' => $randomStatus,
            'accepted_at' => $randomStatus === FriendshipStatus::Accepted ? new \DateTimeImmutable() : null,
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    #[\Override]
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Friendship $friendship): void {})
        ;
    }
}
