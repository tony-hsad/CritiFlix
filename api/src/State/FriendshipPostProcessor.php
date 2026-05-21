<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Config\FriendshipStatus;
use App\Repository\FriendshipRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class FriendshipPostProcessor implements ProcessorInterface
{
    private ProcessorInterface $processor;
    private Security $security;
    private FriendshipRepository $friendshipRepo;

    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        ProcessorInterface $processor,
        Security $security,
        FriendshipRepository $repository
        )
    {
        $this->processor = $processor;
        $this->security = $security;
        $this->friendshipRepo = $repository;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        $userSender = $data->getSender();
        $userReceiver = $data->getReceiver();

        $user = $this->security->getUser();
        $isUserSender = $user === $userSender;
        $isFriendshipExist = $this->friendshipRepo->findAlreadyExistingFriendship($userSender, $userReceiver);
        if ($isUserSender && !$isFriendshipExist) {
            $data->setStatus(FriendshipStatus::Pending);
            $data->setSender($user);
            $data->setRequestDate(new \DateTimeImmutable());
        }


        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
