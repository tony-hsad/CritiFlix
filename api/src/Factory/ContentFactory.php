<?php

namespace App\Factory;

use App\Entity\Content;
use Zenstruck\Foundry\Persistence\PersistentObjectFactory;

/**
 * @extends PersistentObjectFactory<Content>
 */
final class ContentFactory extends PersistentObjectFactory 
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
        return Content::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    #[\Override]
    protected function defaults(): array|callable
    {
        $types = ['Movie', 'Series', 'Documentary'];

        return [
            'title' => self::faker()->text(100),
            'releaseDate' => self::faker()->dateTime(),
            'minimalAge' => self::faker()->numberBetween(3, 18),
            'entrances' => self::faker()->numberBetween(20000, 50000),
            'description' => self::faker()->text(500),
            'type' => self::faker()->randomElement($types),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    #[\Override]
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Content $content): void {})
        ;
    }
}
