#include "newtonraphson.hpp"
#include "algebra.cpp"
#include <math.h>

using namespace algebra;

namespace rootfinding {

  // Define the constructor method of NewtonRaphson instances
  NewtonRaphson::NewtonRaphson(double tolerancein) : tolerance(tolerancein) {}

  // Define the 'solve' method of NewtonRaphson instances
  double NewtonRaphson::solve(double initial_guess) {
    double x = initial_guess;
    double delta_x = 0.0;
    do {
      delta_x = equation(x) / derivative(x);
      iterations.push_back({x, equation(x), derivative(x), delta_x});
      x = x - delta_x;
    } while (fabs(delta_x) >= tolerance);
    return x;
  };
}
