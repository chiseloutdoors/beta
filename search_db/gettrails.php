<!DOCTYPE html>
<html>
<head>
<style>
table {
    width: 100%;
    border-collapse: collapse;
}

table, td, th {
    border: 1px solid black;
    padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
//$q = intval($_GET['q']);

$con = mysqli_connect('localhost','cave_alix','Stackedrocks17','ChiselDB');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ChiselDB");
$sql="SELECT * FROM Trails ";
$result = mysqli_query($con,$sql);

echo "<table>
<tr>
<th>Trail_ID</th>
<th>Trail_Name</th>
<th>Trail_Long</th>
<th>Trail_Lat</th>
</tr>";
while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['Trail_ID'] . "</td>";
    echo "<td>" . $row['Trail_Name'] . "</td>";
    echo "<td>" . $row['Trail_Long'] . "</td>";
    echo "<td>" . $row['Trail_Lat'] . "</td>";
    echo "</tr>";
}
echo "</table>";
mysqli_close($con);
?>
</body>
</html>