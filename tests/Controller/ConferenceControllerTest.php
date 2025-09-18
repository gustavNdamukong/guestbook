<?php

namespace App\Tests\Controller;

// let's use a real browser for the functional tests, instead of a special browser
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
//use Symfony\Component\Panther\PantherTestCase;

// let's use a real browser for the functional tests, instead of a special browser
class ConferenceControllerTest extends WebTestCase
//class ConferenceControllerTest extends PantherTestCase
{
    public function testIndex()
    {
        // let's use a real browser for the functional tests, instead of a special browser
        $client = static::createClient();
        /*
        $client = static::createPantherClient(
		['external_base_uri' =>rtrim(
			$_SERVER['SYMFONY_PROJECT_DEFAULT_ROUTE_URL'], '/')
		    ]
	    ); */
        ///// $client->request('GET', '/');
        $client->request('GET', '/en/');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h2', 'Give your feedback');
    }

    public function testCommentSubmission()
    {
        $client = static::createClient();
    
        // $client->request('GET', '/conference/msterdam');
        $client->request('GET', '/en/conference/amsterdam-2019');
        $client->submitForm('Submit', [
            'comment[author]' => 'Fabien',
            'comment[text]' => 'Some feedback from an automated functional test',
            'comment[email]' => $email = 'me@automat.ed',
            'comment[photo]' => dirname(__DIR__, 2).'/public/images/under-construction.gif',
        ]);
        $this->assertResponseRedirects();

        // simulate comment validation
        $comment = self::getContainer()->get(CommentRepository::class)->findOneByEmail($email);
        $comment->setState('published');
        self::getContainer()->get(EntityManagerInterface::class)->flush();

        $client->followRedirect();
        $this->assertSelectorExists('div:contains("There are 2 comments")');
    }

    public function testConferencePage()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');

        $this->assertCount(2, $crawler->filter('h4'));

        $client->clickLink('View');

        $this->assertPageTitleContains('Amsterdam');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h2', 'Amsterdam 2019');
        $this->assertSelectorExists('div:contains("There are 1 comments")');
    }
}