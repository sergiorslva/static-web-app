using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using Functions.Services;

namespace Functions
{
    public class ListarApontamentosFunction
    {
         [FunctionName("ListarApontamentosFunction")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            ApontamentoService apontamentoService = new ApontamentoService();
            var table = await apontamentoService.CreateTableAsync();
            var result = await apontamentoService.ListEntitiesAsync(table);

            return new OkObjectResult(result);
        }
    }
}
