<?php

namespace App\Factory;

use App\Entity\Interaction;
use App\Factory\ContentFactory;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Persistence\PersistentObjectFactory;

/**
 * @extends PersistentObjectFactory<Interaction>
 */
final class InteractionFactory extends PersistentObjectFactory
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
        return Interaction::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    #[\Override]
    protected function defaults(): array|callable
    {
        return [
            'associatedContent' => ContentFactory::random(),
            'associatedUser' => UserFactory::random(),
            'comment' => self::faker()->sentence(5, false),
            'date' => self::faker()->dateTime(),
            'isLiked' => self::faker()->boolean(0.5),
            'rate' => self::faker()->randomFloat(1, 1, 5),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    #[\Override]
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Interaction $interaction): void {})
        ;
    }
}
