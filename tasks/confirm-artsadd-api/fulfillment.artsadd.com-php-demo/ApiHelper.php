<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/3/27 0027
 * Time: 13:45
 */
class ApiHelper
{
    private $AppKey = "";
    private $AppSecret = "";
    private $StoreID = "";
    private $action = "";
    private $baseUrl = "";
    private $params = [];

    function __construct($AppKey, $AppSecret, $StoreID)
    {
        $this->AppKey = $AppKey;
        $this->AppSecret = $AppSecret;
        $this->StoreID = $StoreID;
    }

    public function setBaseUrl($baseUrl)
    {
        $this->baseUrl = $baseUrl;
    }

    public function setParams($params)
    {
        $this->params = $params;
    }

    public function getHttpApiRequest()
    {
        $time = time();
        $requestParams = ["AppKey" => $this->AppKey, "StoreID" => $this->StoreID, "Timestamp" => $time];
        $signStr = $this->getSign($requestParams, $this->AppSecret);
        $requestParams['Sign'] = $signStr;
        $url = $this->baseUrl;
        $result = $this->post($url, array_merge($this->params,$requestParams));
        return $result;
    }

    public function getSign($params, $AppSecret)
    {
        ksort($params);
        $signStr = hash_hmac('md5', http_build_query($params), $AppSecret);
        return $signStr;
    }    
	
	private function post($url = '', $data = array(), $header = array(), $lifetime = 30)
    {
        if (empty($url)) {
            return false;
        }
        $data = is_array($data) ? http_build_query($data) : $data;
        $ssl = strtolower(substr($url, 0, 8)) == 'https://' ? true : false;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        if ($ssl) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        }
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_TIMEOUT, $lifetime);
        $content = curl_exec($ch);
        curl_close($ch);
        return $content;
    }
}