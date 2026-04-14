<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ContentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['content:item:read']]
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['content:collection:read']]
        ),
    ],
    normalizationContext: ['groups' => ['content:read']]
)]
#[ORM\Entity(repositoryClass: ContentRepository::class)]
class Content
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['content:read', 'content:item:read', 'content:collection:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['content:read', 'content:item:read', 'content:collection:read'])]
    private ?string $title = null;

    #[ORM\Column(length: 500, nullable: true)]
    #[Groups(['content:item:read'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['content:read', 'content:item:read', 'content:collection:read'])]
    private ?\DateTime $releaseDate = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['content:item:read'])]
    private ?int $entrances = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['content:item:read', 'content:collection:read'])]
    private ?string $poster = null;

    #[ORM\Column]
    #[Groups(['content:item:read', 'content:collection:read'])]
    private ?int $minimalAge = null;

    #[ORM\Column(length: 30, nullable: true)]
    #[Groups(['content:read', 'content:item:read', 'content:collection:read'])]
    private ?string $type = null;

    /**
     * @var Collection<int, Interaction>
     */
    #[ORM\OneToMany(targetEntity: Interaction::class, mappedBy: 'associatedContent')]
    private Collection $interactions;

    /**
     * @var Collection<int, Actor>
     */
    #[ORM\ManyToMany(targetEntity: Actor::class, mappedBy: 'contents')]
    private Collection $actors;

    public function __construct()
    {
        $this->interactions = new ArrayCollection();
        $this->actors = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getReleaseDate(): ?\DateTime
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(\DateTime $releaseDate): static
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }

    public function getEntrances(): ?int
    {
        return $this->entrances;
    }

    public function setEntrances(?int $entrances): static
    {
        $this->entrances = $entrances;

        return $this;
    }

    public function getPoster(): ?string
    {
        return $this->poster;
    }

    public function setPoster(?string $poster): static
    {
        $this->poster = $poster;

        return $this;
    }

    public function getMinimalAge(): ?int
    {
        return $this->minimalAge;
    }

    public function setMinimalAge(int $minimalAge): static
    {
        $this->minimalAge = $minimalAge;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Collection<int, Interaction>
     */
    public function getInteractions(): Collection
    {
        return $this->interactions;
    }

    public function addInteraction(Interaction $interaction): static
    {
        if (!$this->interactions->contains($interaction)) {
            $this->interactions->add($interaction);
            $interaction->setAssociatedContent($this);
        }

        return $this;
    }

    public function removeInteraction(Interaction $interaction): static
    {
        if ($this->interactions->removeElement($interaction)) {
            // set the owning side to null (unless already changed)
            if ($interaction->getAssociatedContent() === $this) {
                $interaction->setAssociatedContent(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Actor>
     */
    public function getActors(): Collection
    {
        return $this->actors;
    }

    public function addActor(Actor $actor): static
    {
        if (!$this->actors->contains($actor)) {
            $this->actors->add($actor);
            $actor->addContent($this);
        }

        return $this;
    }

    public function removeActor(Actor $actor): static
    {
        if ($this->actors->removeElement($actor)) {
            $actor->removeContent($this);
        }

        return $this;
    }
}
