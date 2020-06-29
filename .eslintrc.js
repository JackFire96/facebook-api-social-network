module.exports = {
    "extends": "standard",
    "env": {
      "mocha": true
    },
    "rules": {
      "no-new": 0,
      "no-trailing-spaces": 0,
      "no-unused-vars": [
        "error",
        {
          "varsIgnorePattern": "should|expect"
        }
      ]
    }
}