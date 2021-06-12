using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Functions.Services;
using Functions.Model;

namespace Functions
{
    public static class ExcluirApontamentoFunction
    {
       [FunctionName("ExcluirApontamentoFunction")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            ApontamentoService apontamentoService = new ApontamentoService();
            var table = await apontamentoService.CreateTableAsync();

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var dto = JsonConvert.DeserializeObject<ApontamentoModel>(requestBody);

            await apontamentoService.DeleteEntityAsync(table, dto);

            return new OkResult();
        }
    }
}
