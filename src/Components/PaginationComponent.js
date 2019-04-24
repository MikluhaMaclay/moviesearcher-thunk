import React from 'react'
import { Pagination, PaginationItem, PaginationLink, Alert } from "reactstrap";


const PaginationComponent = (props) => {
  return (
    <div className="mx-auto">
              <Pagination
                style={{ justifyContent: "center" }}
                className="mx-auto"
                aria-label="Page navigation"
              >
                <PaginationItem
                  onClick={() => {
                    props.firstPageHandler();
                  }}
                >
                  <PaginationLink first />
                </PaginationItem>

                <PaginationItem
                  disabled={props.currentPage === 1}
                  onClick={() => {
                    props.prevPageHandler();
                  }}
                >
                  <PaginationLink previous />
                </PaginationItem>

                <PaginationItem disabled>
                  <PaginationLink> {props.currentPage} </PaginationLink>
                </PaginationItem>

                <PaginationItem
                  disabled={props.currentPage === props.totalPages}
                  onClick={() => {
                    props.nextPageHandler();
                  }}
                >
                  <PaginationLink next />
                </PaginationItem>

                <PaginationItem
                  onClick={() => {
                    props.lastPageHandler();
                  }}
                >
                  <PaginationLink last />
                </PaginationItem>
              </Pagination>
            </div>
  )
}

export default PaginationComponent
