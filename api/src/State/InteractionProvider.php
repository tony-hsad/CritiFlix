<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\InteractionRepository;

class InteractionProvider implements ProviderInterface
{
    private InteractionRepository $interactionRepo;

    public function __construct(InteractionRepository $repository)
    {
        $this->interactionRepo = $repository;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $userId = $uriVariables['user_id'];
        $contentId = $uriVariables['content_id'];

        return $this->interactionRepo->findOneBy([
            'associatedUser' => $userId, 'associatedContent' => $contentId,
        ]);
    }
}
