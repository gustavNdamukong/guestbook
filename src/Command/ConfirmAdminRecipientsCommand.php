<?php 

namespace App\Command;

use App\Notification\AdminNotificationRecipient;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ConfirmAdminRecipientsCommand extends Command
{
    protected static $defaultName = 'app:test-admin-recipients';

    private AdminNotificationRecipient $adminNotificationRecipient;

    public function __construct(AdminNotificationRecipient $adminNotificationRecipient)
    {
        parent::__construct();
        $this->adminNotificationRecipient = $adminNotificationRecipient;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        dump($this->adminNotificationRecipient->getAdminRecipients());
        return Command::SUCCESS;
    }
}