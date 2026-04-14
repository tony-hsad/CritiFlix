<?php

namespace App\Factory;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Zenstruck\Foundry\Persistence\PersistentObjectFactory;

/**
 * @extends PersistentObjectFactory<User>
 */
final class UserFactory extends PersistentObjectFactory
{
    private \Transliterator $transliterator;

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct(private ?UserPasswordHasherInterface $passwordHasher = null)
    {
        parent::__construct();
        $this->transliterator = \Transliterator::create('Any-Lower; Latin-ASCII');
    }

    protected function normalizeName(string $name): string
    {
        $nameTransliterated = $this->transliterator->transliterate($name);

        return preg_replace('/[^a-zA-Z]/', '.', $nameTransliterated);
    }

    #[\Override]
    public static function class(): string
    {
        return User::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    #[\Override]
    protected function defaults(): array|callable 
    {
        $firstname = self::faker()->firstName();
        $lastname = self::faker()->lastName();
        $domainName = self::faker()->domainName();

        return [
            'dateOfBirth' => self::faker()->dateTime(),
            'email' => "{$this->normalizeName($firstname)}.{$this->normalizeName($lastname)}@$domainName",
            'firstname' => $firstname,
            'lastname' => $lastname,
            'password' => 'test',
            'roles' => ['ROLE_USER'],
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    #[\Override]
    protected function initialize(): static
    {
        return $this
            ->afterInstantiate(function (User $user) {
                if (null !== $this->passwordHasher) {
                    $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));
                }
            })
        ;
    }
}
