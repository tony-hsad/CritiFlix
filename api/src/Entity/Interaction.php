<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\InteractionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['interaction:item:read']]
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['interaction:collection:read']]
        ),
    ],
    normalizationContext: ['groups' => ['interaction:item:read']]
)]
#[ORM\Entity(repositoryClass: InteractionRepository::class)]
class Interaction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['interaction:item:read', 'interaction:collection:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['interaction:item:read', 'interaction:collection:read'])]
    private ?bool $isLiked = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['interaction:item:read', 'interaction:collection:read'])]
    private ?float $rate = null;

    #[ORM\Column(length: 1000, nullable: true)]
    #[Groups(['interaction:item:read'])]
    private ?string $comment = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['interaction:item:read', 'interaction:collection:read'])]
    private ?\DateTime $date = null;

    #[ORM\ManyToOne(inversedBy: 'interactions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['interaction:item:read', 'interaction:collection:read'])]
    private ?User $associatedUser = null;

    #[ORM\ManyToOne(inversedBy: 'interactions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['interaction:item:read', 'interaction:collection:read'])]
    private ?Content $associatedContent = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isLiked(): ?bool
    {
        return $this->isLiked;
    }

    public function setIsLiked(bool $isLiked): static
    {
        $this->isLiked = $isLiked;

        return $this;
    }

    public function getRate(): ?float
    {
        return $this->rate;
    }

    public function setRate(?float $rate): static
    {
        $this->rate = $rate;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getDate(): ?\DateTime
    {
        return $this->date;
    }

    public function setDate(\DateTime $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getAssociatedUser(): ?User
    {
        return $this->associatedUser;
    }

    public function setAssociatedUser(?User $associatedUser): static
    {
        $this->associatedUser = $associatedUser;

        return $this;
    }

    public function getAssociatedContent(): ?Content
    {
        return $this->associatedContent;
    }

    public function setAssociatedContent(?Content $associatedContent): static
    {
        $this->associatedContent = $associatedContent;

        return $this;
    }
}
