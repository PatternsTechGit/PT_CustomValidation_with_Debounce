using Infrastructure;
using Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class AccountService : IAccountService
    {
        private readonly BBBankContext _bbBankContext;
        public AccountService(BBBankContext BBBankContext)
        {
            _bbBankContext = BBBankContext;
        }

        bool IAccountService.AccountNumberExists(string accountNumber)
        {
            try
            {
                return _bbBankContext.Accounts.Any(x => x.AccountNumber == accountNumber);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
