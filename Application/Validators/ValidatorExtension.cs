using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtension
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> rulebuilder)
        {
            var options = rulebuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("Password must be at least 6 characters long")
                .Matches("[A-Z]").WithMessage("Password must contains 1 uspper case characters")
                .Matches("[a-z]").WithMessage("Password must contains 1 lower case characters")
                .Matches("[0-9]").WithMessage("Password must contains a number")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contains non alphanumeric");

            return options;
        }
    }
}