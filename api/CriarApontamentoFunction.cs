using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Functions.Services;
using Newtonsoft.Json;
using Functions.Model;
using System.IO;

namespace Functions
{
    public class CriarApontamentoFunction
    {
         [FunctionName("CriarApontamentoFunction")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            ApontamentoService apontamentoService = new ApontamentoService();
            var table = await apontamentoService.CreateTableAsync();

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();           
            var dto = JsonConvert.DeserializeObject<ApontamentoModel>(requestBody);

            await apontamentoService.InsertOrMergeEntityAsync(table, dto);

            return new OkResult();
        }  
    }
}
