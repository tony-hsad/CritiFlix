<?php

namespace App\Extension;

use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Config\FriendshipStatus;
use App\Entity\Friendship;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;

class FriendshipExtension implements QueryCollectionExtensionInterface
{
    public function __construct(private Security $security)
    {
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }


    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {
        if (Friendship::class !== $resourceClass || $this->security->isGranted('ROLE_ADMIN') || null === $user = $this->security->getUser()) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.receiver = :current_user OR %s.sender = :current_user', $rootAlias, $rootAlias));
        $queryBuilder->andWhere(sprintf('%s.status = :status', $rootAlias, $rootAlias));
        $queryBuilder->setParameter('current_user', $user);
        $queryBuilder->setParameter('status', FriendshipStatus::Accepted);
    }
}
