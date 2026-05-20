<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Config\FriendshipStatus;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class FriendshipPatchProcessor implements ProcessorInterface
{
    private ProcessorInterface $processor;

    public function __construct(#[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')] ProcessorInterface $processor)
    {
        $this->processor = $processor;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        $isStatusAccepted = $data->getStatus() === FriendshipStatus::Accepted;
        if ($isStatusAccepted) {
            $data->setAcceptedAt(new \DateTimeImmutable());
        }

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
