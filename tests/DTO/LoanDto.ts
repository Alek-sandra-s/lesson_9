export class LoanDto {
  income: string
  debt: string
  age: string
  employed: string
  loanAmount: string
  loanPeriod: string

  constructor(
    income: string,
    debt: string,
    age: string,
    employed: string,
    loanAmount: string,
    loanPeriod: string,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static generateLoanPayload({
    income = '1000',
    debt = '1',
    age = '26',
    employed = 'true',
    loanAmount = '100',
    loanPeriod = '6',
  }: {
    income?: string
    debt?: string
    age?: string
    employed?: string
    loanAmount?: string
    loanPeriod?: string
  }): LoanDto {
    return new LoanDto(income, debt, age, employed, loanAmount, loanPeriod)
  }
}
