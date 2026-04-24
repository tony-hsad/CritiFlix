<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\ExactFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\QueryParameter;
use App\Config\FriendshipStatus;
use App\Repository\FriendshipRepository;
use App\State\FriendshipPatchProcessor;
use App\State\FriendshipPostProcessor;
use App\State\FriendshipProvider;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: FriendshipRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_FRIENDSHIP_SENDER_RECEIVER', fields: ['sender', 'receiver'])]
#[ApiResource(
    operations: [
        new Get(
            security: "is_granted('ROLE_USER') and (object.getSender() == user or object.getReceiver() == user)"
        ),
        new Get(
            uriTemplate: '/friendships/{sender_id}/{receiver_id}',
            security: "is_granted('ROLE_USER') and (object.getSender() == user or object.getReceiver() == user)",
            provider: FriendshipProvider::class
        ),
        new GetCollection(
            security: "is_granted('ROLE_USER')",
            parameters: [
                'status' => new QueryParameter(
                    filter: new ExactFilter(),
                    property: 'status',
                ),
                'sender_id' => new QueryParameter(
                    filter: new ExactFilter(),
                    property: 'sender.id',
                ),
                'receiver_id' => new QueryParameter(
                    filter: new ExactFilter(),
                    property: 'receiver.id',
                ),
            ],
        ),
        new Post(
            denormalizationContext: ['groups' => ['friendship:write']],
            security: "is_granted('ROLE_USER')",
            processor: FriendshipPostProcessor::class
        ),
        new Patch(
            denormalizationContext: ['groups' => ['friendship:update']],
            security: "is_granted('ROLE_USER') and object.getReceiver() == user",
            processor: FriendshipPatchProcessor::class,
        ),
        new Delete(
            security: "is_granted('ROLE_USER') and (object.getSender() == user or object.getReceiver() == user)",
        ),
    ],
    normalizationContext: ['groups' => ['friendship:read', 'user:read']],
)]
#[ORM\HasLifecycleCallbacks]
class Friendship
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['friendship:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'sentFriendRequests')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['friendship:read', 'user:read'])]
    private ?User $sender = null;

    #[ORM\ManyToOne(inversedBy: 'receivedFriendRequests')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['friendship:read', 'friendship:write', 'user:read'])]
    private ?User $receiver = null;

    #[ORM\Column(length: 15, enumType: FriendshipStatus::class)]
    #[Groups(['friendship:read', 'friendship:update'])]
    private ?FriendshipStatus $status = null;

    #[ORM\Column]
    #[Groups(['friendship:read'])]
    private ?\DateTimeImmutable $requestDate = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['friendship:read'])]
    private ?\DateTimeImmutable $acceptedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSender(): ?User
    {
        return $this->sender;
    }

    public function setSender(?User $sender): static
    {
        $this->sender = $sender;

        return $this;
    }

    public function getReceiver(): ?User
    {
        return $this->receiver;
    }

    public function setReceiver(?User $receiver): static
    {
        $this->receiver = $receiver;

        return $this;
    }

    public function getStatus(): ?FriendshipStatus
    {
        return $this->status;
    }

    public function setStatus(FriendshipStatus $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getRequestDate(): ?\DateTimeImmutable
    {
        return $this->requestDate;
    }

    public function setRequestDate(\DateTimeImmutable $requestDate): static
    {
        $this->requestDate = $requestDate;

        return $this;
    }

    #[ORM\PrePersist]
    public function setRequestDateValue(): static
    {
        $this->requestDate = new \DateTimeImmutable();

        return $this;
    }

    public function getAcceptedAt(): ?\DateTimeImmutable
    {
        return $this->acceptedAt;
    }

    public function setAcceptedAt(?\DateTimeImmutable $acceptedAt): static
    {
        $this->acceptedAt = $acceptedAt;

        return $this;
    }
}
