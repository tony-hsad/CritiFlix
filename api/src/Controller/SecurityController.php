<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SecurityController extends AbstractController
{
    #[Route(path: '/api/login', name: 'api_login', methods: ['POST'])]
    public function login(): Response
    {
        // $user = $this->getUser();

        // return $this->json([
        //     'firstname' => $user->getFirstname(),
        //     'lastname' => $user->getLastname(),
        //     'roles' => $user->getRoles(),
        // ]);
        throw new \Exception('This should never be reached');
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
