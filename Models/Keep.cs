using System;

namespace API_Users.Models{

public class Keep
{
public int Id { get; set; }
public int ViewCount { get; set; }
public int KeepCount { get; set; }
public string Name { get; set; }
public string Description { get; set; }
public string userId { get; set; }

public string ImgURL {get; set;}

}



}