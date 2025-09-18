<?php

namespace App\Notification;

use Symfony\Component\Notifier\Recipient\Recipient;
use Symfony\Component\Notifier\Recipient\RecipientInterface;
use Symfony\Component\Notifier\NotifierInterface;

class AdminNotificationRecipient
{
    /** @var RecipientInterface[] */
    private array $recipients;

    public function __construct(iterable $adminRecipients)
    {
        // $adminRecipients will be an iterable of arrays with 'email' keys
        $this->recipients = [];
        foreach ($adminRecipients as $recipient) {
            if (isset($recipient['email'])) {
                $this->recipients[] = new Recipient($recipient['email']);
            }
        }
    }

    /**
     * @return RecipientInterface[]
     */
    public function getAdminRecipients(): array
    {
        return $this->recipients;
    }
}