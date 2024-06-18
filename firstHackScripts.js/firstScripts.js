/** @param {NS} ns */
//Self-contained algorithm
//My very first script from the supporting documentation

export async function main(ns) {
  let host = ns.args[0]; // when you run the script via terminal you can pass arguments (as a string)
  // run firstScripts.js n00dles

  let moneyThresh = ns.getServerMaxMoney(host) * 0.75; // getServerMaxMoney do exactly what is says. Here we calculate money threshold
  let securityThresh = ns.getServerMinSecurityLevel(host) + 5; // getServerMinSecurityLevel do exactly what is says. Here we calculate security threshold

  // infinite loop
  while (true) {
    // if current server security level bigger than the our security threshold
    if (ns.getServerSecurityLevel(host) > securityThresh) {
      // ns.tprint allows leave info about current nums (you can put what you want)
      ns.print(`Current security level - ${ns.getServerSecurityLevel(host)}, min lvl - ${securityThresh}`);
      // weaken\grow\hack are async functions, so you must await them to done there job
      await ns.weaken(host);
    } 

    // if current server money available less than the our money threshold
    else if (ns.getServerMoneyAvailable(host) < moneyThresh) {
      ns.print(`Server Money Available - ${ns.getServerMoneyAvailable(host)}, min money - ${moneyThresh}`);
      await ns.grow(host);
    }

    //if server security level less than security threshold and there is more available money than moneyThresh
    else {
      ns.print(`Money available - ${ns.getServerMoneyAvailable(host)}, money threshold - ${moneyThresh}`);
      await ns.hack(host);
    }
  }
}
