<?php

namespace modules\controllers;

use Craft;
use craft\web\Controller;
use dolphiq\redirect\elements\Redirect;
use dolphiq\redirect\RedirectPlugin;
use yii\web\Response;

class RedirectController extends Controller
{
    protected $allowAnonymous = true;

    /**
     * Share redirects with the Nuxt.js redirect module.
     *
     * @return Response
     */
    public function actionIndex(): Response
    {
        $siteId = Craft::$app->getSites()->currentSite->id;
        $redirects = RedirectPlugin::$plugin->getRedirects()->getAllRedirectsForSite($siteId);

        $results = [];

        /** @var Redirect $redirect */
        foreach ($redirects as $redirect) {
            if ($redirect->status === 'enabled') {
                $results[] = [
                    'from'       => '/' . $redirect->sourceUrl,
                    'to'         => $redirect->destinationUrl,
                    'statusCode' => (int)$redirect->statusCode
                ];
            }
        }

        return $this->asJson($results);
    }
}