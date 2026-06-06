<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\InteractionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(),
        new Get(
            uriTemplate: '/interactions/{user_id}/{content_id}',
            normalizationContext: ['groups' => ['interaction:read', 'interaction:user:read']],
            security: "is_granted('ROLE_USER')",
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['interaction:read', 'interaction:user:read']],
        ),
        new Post(
            normalizationContext: ['groups' => ['interaction:read']],
            denormalizationContext: ['groups' => ['interaction:write']],
            security: "is_granted('ROLE_USER')",
            validationContext: ['groups' => ['interaction:write']],
        ),
        new Patch(
            normalizationContext: ['groups' => ['interaction:read']],
            denormalizationContext: ['groups' => ['interaction:update']],
            security: "is_granted('ROLE_USER') and object.getAssociatedUser() == user",
            validationContext: ['groups' => ['interaction:write']],
        ),
        new Delete(
            security: "is_granted('ROLE_USER') and object.getAssociatedUser() == user",
        ),
    ],
    normalizationContext: ['groups' => ['interaction:read']]
)]
#[ORM\Entity(repositoryClass: InteractionRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['associatedContent' => 'exact'])]
class Interaction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['interaction:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['interaction:read', 'interaction:write', 'interaction:update'])]
    private ?bool $isLiked = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['interaction:read', 'interaction:write', 'interaction:update'])]
    private ?float $rate = null;

    #[ORM\Column(length: 1000, nullable: true)]
    #[Groups(['interaction:read', 'interaction:write', 'interaction:update'])]
    private ?string $comment = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['interaction:read', 'interaction:write'])]
    private ?\DateTime $date = null;

    #[ORM\ManyToOne(inversedBy: 'interactions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['interaction:read', 'interaction:write', 'interaction:user:read'])]
    private ?User $associatedUser = null;

    #[ORM\ManyToOne(inversedBy: 'interactions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['interaction:read', 'interaction:write'])]
    private ?Content $associatedContent = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsLiked(): ?bool
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
