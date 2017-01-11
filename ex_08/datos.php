<?php
//content-type header application/json
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->id;

echo json_encode(array(
    "msg"=> $id
));

?>
