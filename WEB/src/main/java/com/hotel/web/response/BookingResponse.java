package com.hotel.web.response;

import com.hotel.web.model.Room;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingResponse {

    private Long Id;
    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private String guestFullName;

    private  String guestEmail;

    private int numOfAdults;

    private  int numOfChildren;

    private int totalNumOfGuest;

    private String bookingConfirmationCode;

    private RoomResponse room;

    public BookingResponse(String bookingConfirmationCode, Long id, LocalDate checkInDate, LocalDate checkOutDate) {
        this.bookingConfirmationCode = bookingConfirmationCode;
        Id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }

}
