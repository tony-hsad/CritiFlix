<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\FriendshipRepository;

class FriendshipProvider implements ProviderInterface
{
    private FriendshipRepository $friendshipRepo;

    public function __construct(FriendshipRepository $repository)
    {
        $this->friendshipRepo = $repository;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $senderId = $uriVariables['sender_id'];
        $receiverId = $uriVariables['receiver_id'];

        return $this->friendshipRepo->findOneBy([
            'sender' => $senderId, 'receiver' => $receiverId,
        ]);
    }
}
