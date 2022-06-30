using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts
{
    public interface IAccountService
    {
        public bool AccountNumberExists(string accountNumber);

    }
}
