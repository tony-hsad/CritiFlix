<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ActorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['actor:read', 'actor:item:read']]
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['actor:read', 'actor:collection:read']]
        ),
    ],
    normalizationContext: ['groups' => ['actor:read']]
)]
#[ORM\Entity(repositoryClass: ActorRepository::class)]
class Actor
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['actor:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['actor:read'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 50)]
    #[Groups(['actor:read'])]
    private ?string $lastname = null;

    /**
     * @var Collection<int, Content>
     */
    #[ORM\ManyToMany(targetEntity: Content::class, inversedBy: 'actors')]
    #[Groups(['actor:item:read'])]
    private Collection $contents;

    public function __construct()
    {
        $this->contents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * @return Collection<int, Content>
     */
    public function getContents(): Collection
    {
        return $this->contents;
    }

    public function addContent(Content $content): static
    {
        if (!$this->contents->contains($content)) {
            $this->contents->add($content);
        }

        return $this;
    }

    public function removeContent(Content $content): static
    {
        $this->contents->removeElement($content);

        return $this;
    }
}
