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

namespace Functions
{
    public static class ListarPorPartitionERowkeyFunction
    {
        [FunctionName("ListarPorPartitionERowkeyFunction")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string partitionkey = req.Query["partitionkey"]; 
            string rowkey = req.Query["rowkey"];

            ApontamentoService apontamentoService = new ApontamentoService();
            var table = await apontamentoService.CreateTableAsync();

            var dto = await apontamentoService.GetEntityAsync(table, partitionkey, rowkey);

            return new OkObjectResult(dto);
        }
    }
}
