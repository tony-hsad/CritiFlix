<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserPasswordProcessor implements ProcessorInterface
{
    private ProcessorInterface $processor;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        ProcessorInterface $processor, 
        UserPasswordHasherInterface $passwordHasher
        ) 
    {
        $this->processor = $processor;
        $this->passwordHasher = $passwordHasher;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        $password = $data->getPassword();

        if ($data instanceof User && $password) {
            $isPasswordHashed = password_get_info($password)['algo'];

            if (!$isPasswordHashed) {
                $hashedPassword = $this->passwordHasher->hashPassword($data, $password);
                $data->setPassword($hashedPassword);
            }
        }

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
