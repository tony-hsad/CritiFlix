<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

class MeController extends AbstractController
{
    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(SerializerInterface $serializer): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => '401 Unauthorized (you are not authenticated)'], 401);
        }

        $jsonContent = $serializer->serialize(
            $user,
            'json',
            ['groups' => ['user:me', 'user:read', 'user:item:read']],
        );

        return JsonResponse::fromJsonString($jsonContent);
    }
}
