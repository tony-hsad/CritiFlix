<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class MeController extends AbstractController
{
    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => '401 Unauthorized (you are not authenticated)'], 401);
        }

        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getUserIdentifier(),
            'interactions' => $user->getInteractions(),
            'friends' => $user->getFriends(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'dateOfBirth' => $user->getDateOfBirth(),
            'createdAt' => $user->getCreatedAt(),
            'roles' => $user->getRoles(),
        ]);
    }
}
