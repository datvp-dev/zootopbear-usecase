<?php

require_once "ApiHelper.php";

$orders = [
	"order" => [
		"customer" => "Tom",
		"address1" => "Software Park2",
		"address2" => "",
		"country" => "CN",
		"state" => "Fj",
		"city" => "Xiamen",
		"postalcode" => "361009",
		"phone" => "0592-8888888",
		"memo" => "",
		"add_time" => date('Y-m-d H:i:s', time()),
		"id" => 'TS202210201052',
		"currency" => "",
		"shipping_name" => "Standard",
		"total_amout" => 20,
		"email" => "test@gmail.com",
	],
	"items" => [
		[
			"quantity" => 2,
			"id" => md5(date('YmdHis') . "ff"),
			"shipping_price" => 5.9,
			"product_price" => 28.9,
			"product_sku" => "DG34656XH5464D",
			"memo" => "it's test item",
		],
		[
			"quantity" => 3,
			"id" => md5(date('YmdHis') . "ee"),
			"shipping_price" => 3.9,
			"product_price" => 57.9,
			"product_sku" => "DG787XH55654D",
			"memo" => "it's test item",
		]
	],
	'products' => [
		[
			"product_sku" => "DG34656XH5464D",
			"brand" => "YJL",
			"title" => "Test Product Title1",
			"images" => ["http://gen-dan-print-image.oss-cn-shenzhen.aliyuncs.com/D6FA7E2DD6932ABBCA2C5F3B60BD3531.jpg", "http://gen-dan-print-image.oss-cn-shenzhen.aliyuncs.com/7A47C8081997AA58F3753EB093BBFB61.jpg"],
			"size" => "XL",
			"color" => "",
			"supplier_sku" => "CCWSP15",
			"prints" => ["http://gen-dan-print-image.oss-cn-shenzhen.aliyuncs.com/CAA0A1D5871B41DCEF404298E7AA322B.jpg"]
		],
		[
			"product_sku" => "DG787XH55654D",
			"brand" => "YJL",
			"title" => "Test Product Title2",
			"images" => ["http://gen-dan-print-image.oss-cn-shenzhen.aliyuncs.com/D6FA7E2DD6932ABBCA2C5F3B60BD3531.jpg", "http://gen-dan-print-image.oss-cn-shenzhen.aliyuncs.com/7A47C8081997AA58F3753EB093BBFB61.jpg"],
			"size" => "S",
			"color" => "",
			"supplier_sku" => "CCWSP49",
			"prints" => ["http://gen-dan-print-image.oss-cn-shenzhen.aliyuncs.com/CAA0A1D5871B41DCEF404298E7AA322B.jpg"]
		]
	]
];

$AppKey = "xxxxxxxxxxx";
$AppSecret = "xxxxxxxxxxxxxxxxxxxxxxxxxxx";
$StoreID = "xxxxxxxxxxxxxxxxxxxxxxxxxxx";

//create order
$apiHelper = new \ApiHelper($AppKey, $AppSecret, $StoreID);
$apiHelper->setBaseUrl("http://fulfillment.artsadd.com/api/order/create");
$apiHelper->setParams($orders);
$ret = $apiHelper->getHttpApiRequest(); var_dump($ret); exit;

//get order 
$query = ['AppKey'=>$AppKey, "Timestamp" => time(),'StoreID'=>$StoreID];
$query['Sign'] = $apiHelper->getSign($query, $AppSecret);
$arr = file_get_contents('http://fulfillment.artsadd.com/api/order/getinfo/TS202210201052' . '?' . http_build_query($query));
var_dump($arr);exit;

?>

