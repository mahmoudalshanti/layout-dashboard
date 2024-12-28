import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { Calendar as CalenderType, formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

interface CalenderEvents {
  title: string;
  id: string;
  start: string;
}

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState<CalenderEvents[]>([]);

  const handleDateClick = (selectedEV: {
    dateStr: string;
    startStr: string;
    endStr: string;
    view: {
      calendar: CalenderType;
    };
  }) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectedEV.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selectedEV.dateStr}-${title}`,
        title,
        start: selectedEV.startStr,
        end: selectedEV.endStr,
      });
    }
  };

  const handleEventClick = (selectedEV: {
    event: {
      remove: () => void;
      title: string;
    };
  }) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selectedEV.event.title}'`
      )
    ) {
      selectedEV.event.remove();
    }
  };

  const isMeduim: boolean = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={isMeduim ? "column" : "row"}
      >
        {/* Calendar Sidebar*/}
        <Box
          sx={{ overflowY: "scroll" }}
          height={"71vh"}
          mb={isMeduim ? 5 : 0}
          flex="1 1 20%"
          bgcolor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map(
              (event: { id: string; title: string; start: string }) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              )
            )}
          </List>
        </Box>

        {/* Calendar*/}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="71vh" // ************************ interaction click
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true} // move between boxes
            selectable={true} // multi select
            dayMaxEvents={true} // +3 more
            select={handleDateClick}
            selectMirror={true}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
