def minUmbrellas(umbrella, m):

    n, inf = len(umbrella), 1e9

# For storing the results of the subproblems.
    dp = [[0 for j in range(m + 1)] for i in range(n + 1)]

for i in range(n + 1):
for j in range(m + 1):

# If the required number of people to shelter is 0 then we dont require any umbrellas.
if (j == 0):
dp[i][j] = 0

# If we dont have any umbrellas left to shelter M people, then return INF.
elif (i == 0):
dp[i][j] = inf
else:
dp[i][j] = dp[i - 1][j]

if (j >= umbrella[i - 1]):
dp[i][j] = min(dp[i][j], 1 + dp[i - 1][j - umbrella[i - 1]])

ans = dp[n][m]

if (ans >= inf):
return -1
