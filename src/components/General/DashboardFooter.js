import React from 'react'
import dateFns from "date-fns"

export const DashboardFooter = () => (
  <footer>
    <p>Copyright The Calltime &copy; {dateFns.format(new Date(), "YYYY")}</p>
  </footer>
)