using ExcelDataReader;
using FileUplodDownLoadSample.Models;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Diagnostics;

namespace FileUplodDownLoadSample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {         
            return View();
        }
        [HttpPost]
        public Tuple<string, int, int> ULFiles(List<IFormFile> files)
        {
            string errorMsg = "";
            int  FailCount = 0, SuccessCount = 0,count=0;
            foreach(var file in files)
            {
                count++;
                string msg = file.FileName;
                errorMsg += " <p class='mgB5'>";
                errorMsg += "第" + count + "個檔案: " + msg + "。";
                errorMsg += "</p>";
            }
            return Tuple.Create(errorMsg, SuccessCount, FailCount);
        }

        [HttpPost]
        public Tuple<string, int, int> ULExcel(IFormFile excelFile)
        {
            int SuccessCount = 0, FailCount = 0, count = 0;
            
            string errorMsg = "";
            if (excelFile == null)
            {
                errorMsg = "檔案不能是空的。";
                return Tuple.Create(errorMsg, SuccessCount, FailCount);
            }                
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            using (var stream = new MemoryStream())
            {
                excelFile.CopyTo(stream);
                stream.Position = 0;
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    while (reader.Read()) //Each row of the file
                    {
                        count++;
                        if (count == 1)                        
                            continue;   
                        if (reader.GetValue(0) == null)
                            break;
                        var cell_1 = reader.GetValue(0);
                        var cell_2 = reader.GetValue(1);
                        var cell_3 = reader.GetValue(2);
                        string msg = cell_1 + ";" + cell_2 + ";" + cell_3;
                        errorMsg += " <p class='mgB5'>";
                        errorMsg += "第" + (count - 1) + "筆資料: " + msg + "。";
                        errorMsg += "</p>";                      
                    }
                }
            }  
            return Tuple.Create(errorMsg, SuccessCount, FailCount);
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}