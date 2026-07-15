export function generateTicketNumber(): string {
    let num = ''
    for (let i = 0; i < 10; i++) {
      const digit = Math.floor(Math.random() * 10)
      if (i === 0 && digit === 0) { i--; continue } // avoid leading zero
      num += digit
    }
    return num
  }