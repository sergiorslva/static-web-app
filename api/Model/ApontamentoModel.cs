using Microsoft.Azure.Cosmos.Table;
using System;

namespace Functions.Model
{
    public class ApontamentoModel : TableEntity
    {
        public ApontamentoModel()            
        {
            PartitionKey = Guid.NewGuid().ToString();
            RowKey = Guid.NewGuid().ToString();
        }

        public ApontamentoModel(string lastName, string firstName)
        {
            PartitionKey = lastName;
            RowKey = firstName;
        }

        public DateTime Data { get; set; }        
        public double Valor { get; set; }
    }
}
