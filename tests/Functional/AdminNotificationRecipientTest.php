<?php

namespace App\Tests\Functional;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use App\Notification\AdminNotificationRecipient;

class AdminNotificationRecipientTest extends KernelTestCase
{
    public function testGetAdminRecipientsReturnsExpectedData(): void
    {
        self::bootKernel();
        $container = static::getContainer();

        /** @var AdminNotificationRecipient $recipientService */
        $recipientService = $container->get(AdminNotificationRecipient::class);

        $recipients = $recipientService->getAdminRecipients();
        dump($recipients);

        $this->assertIsArray($recipients, 'Recipients should be returned as an array');
        $this->assertNotEmpty($recipients, 'Recipients array should not be empty');
        $this->assertInstanceOf(
            \Symfony\Component\Notifier\Recipient\Recipient::class,
    $recipients[0],
    'First recipient should be a Notifier Recipient object'
        );

        $this->assertSame(
            getenv('ADMIN_EMAIL') ?: 'gustavfn@yahoo.co.uk',
            $recipients[0]->getEmail(),
            'The email should match the default or ENV value'
        );
    }
}