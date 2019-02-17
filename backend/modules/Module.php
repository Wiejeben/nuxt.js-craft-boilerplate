<?php

namespace modules;

use Craft;

class Module extends \yii\base\Module
{
    /**
     * Initializes the module.
     */
    public function init()
    {
        $request = Craft::$app->getRequest();

        Craft::setAlias('@modules', __DIR__);
        $this->controllerNamespace = ($request->getIsConsoleRequest()) ? 'modules\\console\\controllers' : 'modules\\controllers';
        parent::init();

        // TODO: To automatically parse JSON body. (Note: Doesn't yet work in combination with CraftQL)
//        if (!$request->getIsConsoleRequest()) {
//            $request->parsers += [
//                'application/json' => \yii\web\JsonParser::class,
//            ];
//        }

        // TODO: To allow XHR from external website
//        header('Access-Control-Allow-Origin: *');
//        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
//        header('Access-Control-Allow-Headers: Authorization, Content-Type');

        // TODO: To answer OPTIONS requests
//        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//            header('Access-Control-Allow-Origin: *');
//            header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
//            header('Access-Control-Allow-Headers: Authorization, Content-Type');
//            die();
//        }
    }
}
